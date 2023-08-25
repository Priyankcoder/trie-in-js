import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

class Trie {
  constructor() {
    this.node = new this.createNode(null);
  }

  createNode(char) {
    this.value = char;
    this.wordEnd = false;
    this.children = {};
  }

  addWord(word) {
    let node = this.node;
    for (let char of word) {
      if (!node.children.hasOwnProperty(char)) {
        node.children[char] = new this.createNode(char);
      }
      node = node.children[char];
    }
    node.wordEnd = true;
  }

  addWordList(list) {
    for (let word of list) {
      this.addWord(word);
    }
  }

  findPrefixMatches(word) {
    let node = this.node,
      matches = [];
    for (let char of word) {
      if (!node.children.hasOwnProperty(char)) {
        return matches;
      }
      node = node.children[char];
    }
    let queue = [[node, word]];
    while (queue.length) {
      let [parent, prefWord] = queue.shift();
      if (!!parent.wordEnd) {
        matches.push(prefWord);
      }
      for (let childKey in parent.children) {
        const child = parent.children[childKey];
        queue.push([child, prefWord + childKey]);
      }
    }
    return matches;
  }

  searchWord(word) {
    let node = this.node;
    for (let char of word) {
      if (!node.children.hasOwnProperty(char)) {
        return false;
      }
      node = node.children[char];
    }
    return node.wordEnd;
  }
}

const newTrie = new Trie();

newTrie.addWordList(["abc", "abcd"]);

console.log(newTrie.findPrefixMatches("abc"));

console.log(newTrie.searchWord("abc"));
