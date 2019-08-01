import { Injectable } from '@angular/core';

// Source: https://stackoverflow.com/questions/37469768/infix-to-binary-expression-tree

// abstract base-class
class ExpressionNode {
  compute(context) { throw new Error('not implemented'); }
  toString() { throw new Error('not implemented'); }
}

// leaf-nodes
class ValueNode extends ExpressionNode {
  public value: any;
  constructor(value) {
      super();
      this.value = value;
  }
  compute() { return this.value; }
  toString() { return JSON.stringify(this.value); }
}

class PropertyNode extends ExpressionNode {
  public property: any;
  constructor(property) {
      super();
      this.property = property;
  }
  compute(context) { return context[this.property]; }
  toString() { return String(this.property); }
}

// tree-nodes
class UnaryNode extends ExpressionNode {

  public static operators = ['NOT'];
  public op: string;
  public node: ExpressionNode;

  constructor(op, node) {
      if (!(node instanceof ExpressionNode)) {
          throw new Error('invalid node passed');
      }
      super();
      this.op = op;
      this.node = node;
  }
  compute(context) {
      const v: any = this.node.compute(context);
      switch (this.op) {
          case 'NOT': return !v;
      }
      throw new Error('operator not implemented \'' + this.op + '\'');
  }
  toString() {
      return  '( ' + this.op + ' ' + this.node.toString() + ' )';
  }
}

class BinaryNode extends ExpressionNode {

  public static  operators = [
      '*', '/', '+', '-',
      '>', '<', '<=', '>=', '!=', '=',
      'and', 'or',
  ];

  public left: ExpressionNode;
  public op: string;
  public right: ExpressionNode;

  constructor(op: any, l: any, r: any) {
      if (!(l instanceof ExpressionNode && r instanceof ExpressionNode)) {
          throw new Error('invalid node passed');
      }
      super();
      this.op = op;
      this.left = l;
      this.right = r;
  }

  compute(context) {
      const l: any = this.left.compute(context);
      const r: any = this.right.compute(context);

      switch (this.op) {
          // logic operators
          case 'and': return l && r;
          case 'or': return l || r;

          // comparison-operators
          case '=': return l === r;
          case '<=': return l <= r;
          case '>=': return l >= r;
          case '!=': return l !== r;
          case '>': return l > r;
          case '<': return l < r;

          // computational operators
          case '+': return l + r;
          case '-': return l - r;
          case '*': return l * r;
          case '/': return l / r;
      }
      throw new Error('operator not implemented \'' + this.op + '\'');
  }

  toString() {
      return '( ' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ' )';
  }
}

// dot is kind of special:
class DotNode extends BinaryNode {
  constructor(l: any, r: any) {
      if (!(r instanceof PropertyNode)) {
          throw new Error('invalid right node');
      }
      super('.', l, r);
  }

  compute(context) {
      // especially because of this composition: fetch the right property in the context of the left result
      return this.right.compute( this.left.compute(context) );
  }
  toString() {
      return this.left.toString() + '.' + this.right.toString();
  }
}


@Injectable({
  providedIn: 'root'
})
export class ExpressionService {

  tokenParser = new RegExp([
      // numbers
      /\d+(?:\.\d*)?|\.\d+/.source,

      // string-literal
      /["](?:\\[\s\S]|[^"])+["]|['](?:\\[\s\S]|[^'])+[']/.source,

      // booleans
      // "true|false",

      // operators
      ['.', '(', ')'].concat(UnaryNode.operators, BinaryNode.operators)
          .sort((a, b) => b.length - a.length) // so that ">=" is added before "=" and ">", for example
          .map(this.escapeForRegex)
          .join('|'),

      // properties
      // has to be after the operators
      /[a-zA-Z$_][a-zA-Z0-9$_]*/.source,

      // remaining (non-whitespace-)chars, just in case has to be at the end
      /\S/.source
  ].map(s => '(' + s + ')').join('|'), 'g');


  private escapeForRegex(str) {
    return String(str).replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&');
  }

  private process(tokens) {
    UnaryNode.operators.forEach(token => {
        // for (let i = -i; (i = tokens.indexOf(token, i + 1)) > -1;) {
        for (let i; (i = tokens.indexOf(token, i + 1)) > -1;) {
            tokens.splice(i, 2, new UnaryNode(token, tokens[i + 1]));
        }
    });

    BinaryNode.operators.forEach(token => {
        for (let i = 1; (i = tokens.indexOf(token, i - 1)) > -1;) {
            tokens.splice(i - 1, 3, new BinaryNode(token, tokens[i - 1], tokens[i + 1]));
        }
    });

    if (tokens.length !== 1) {
        console.log('error: ', tokens.slice());
        throw new Error('something went wrong');
    }
    return tokens[0];
  }

 parse(str) {
  const tokens = [];
  // abusing str.replace() as a RegExp.forEach
  str.replace(this.tokenParser, function(token, number, literal, op, property) {
      if (number) {
          token = new ValueNode(+number);
      } else if (literal) {
          token = new ValueNode(literal.substring(1, literal.length - 1));
      } else if (property) {
          token = new PropertyNode(property);
      } else if (!op) {
          throw new Error('unexpected token \'' + token + '\'');
      }
      tokens.push(token);
    });

  for (let i; (i = tokens.indexOf('.')) > -1; ) {
        tokens.splice(i - 1, 3, new DotNode(tokens[i - 1], tokens[i + 1]));
    }

  for (let i, j; (i = tokens.lastIndexOf('(')) > -1 && (j = tokens.indexOf(')', i)) > -1;) {
        tokens.splice(i, j + 1 - i, this.process(tokens.slice(i + 1, j)));
    }
  if (~tokens.indexOf('(') || ~tokens.indexOf(')')) {
        throw new Error('mismatching brackets');
    }

  return this.process(tokens);
  }

}
