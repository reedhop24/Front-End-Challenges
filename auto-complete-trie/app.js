let Node = function() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
        this.end = true;
    };
    this.isEnd = function() {
        return this.end;
    }
}

let Trie = function() {
    this.root = new Node();

    this.add = function(input, node=this.root) {
        if(input.length === 0) {
            node.setEnd();
            return;
        } else if(!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        } else {
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
    };

    this.isWord = function(word) {
        let node = this.root;
        while(word.length > 1) {
            if(!node.keys.has(word[0])) {
                return false;
            } else {
                node = node.keys.get(word[0]);
                word = word.substr(1);
            };
        };
        return(node.keys.has(word) && node.keys.get(word).isEnd())
    }

    this.print = function() {
        let words = new Array();
        let search = function(node, string) {
            if(node.keys.size != 0) {
                for(let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                };
                if(node.isEnd()) {
                    words.push(string);
                }
            } else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            };
        };
        search(this.root, new String());
        return words.length > 0 ? words : null;
    } 
    
    this.autoComplete = function(word) {
        let node = this.root;
        let autoWord = '';
        while(word.length > 0) {
            if(!node.keys.has(word[0])) {
                return false;
            } else {
                node = node.keys.get(word[0]);
                if(word.length === 1) {
                    findMatch = function(auto) {
                        if(auto) {
                            autoWord += auto[0];
                            if(!auto[1].end) {
                                findMatch(auto[1].keys.entries().next().value);
                            } 
                        }
                    }
                    findMatch(node.keys.entries().next().value)
                } 
                word = word.substr(1);
            };
        };
        return autoWord;
    }
};

window.addEventListener('load', () => {
    myTrie = new Trie()
    myTrie.add('ball');
    myTrie.add('bat');
    myTrie.add('doll');
    myTrie.add('dork');
    myTrie.add('do');
    myTrie.add('dorm');
    myTrie.add('send');
    myTrie.add('sense');

    let input = document.getElementById('auto-input');
    let div = document.getElementById('editable-div');
    let add = document.getElementById('auto-add');
    let addButton = document.getElementById('add-button');

    input.addEventListener('input', () => {
        div.attributes[2].value = myTrie.autoComplete(input.innerHTML) ? input.innerHTML + myTrie.autoComplete(input.innerHTML) : input.innerHTML;
    });

    addButton.addEventListener('click', () => {
        myTrie.add(add.value);
    })
});