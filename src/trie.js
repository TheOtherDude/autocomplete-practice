/**
 * Created by Phillip on 5/21/2016.
 */
'use strict';
const Trie = function(input) {
    this._root = {};
};

Trie.prototype = {
    add: function(value) {
        value.toLowerCase();
        const arr = value.split('');
        let current = this._root;
        arr.forEach(element => {
            if (typeof current[element] === "undefined") {
                current[element] = {};
            }
            current = current[element];
        });
        current["END"] = true;
    },

    remove: function(value) {
        const arr = value.split('');
        let current = this._root;
        arr.forEach(element => {
            if (typeof current[element] === "undefined") {
                return;
            }
            let bridge = current[element];
            if (Object.keys(current[element]).length === 1) {
                current[element] = {};
            }
            current = bridge;
        });
        current["END"] = false;
    },

    breadthFirstSearch: function(startingNode, callback) {
        let current = null;
        let frontier = startingNode ? [{node: startingNode, path: ''}] : [{node: this._root, path: ''}];
        let results = [];
        let path = '';

        while(frontier.length > 0) {
            current = frontier.shift(); //O(N) complexity most likely...
            for (let key in current.node) {
                if (key != "END") {
                    path = current.path + key;
                    frontier.push({node: current.node[key], path: path});
                }
                else if (current.node.END) {
                    results.push(current.path);
                }
            }
        }

        callback.call(this, results);

    },

    depthFirstSearch: function(callback) {
        let current = null;
        let path = '';
        let frontier = [{node: this._root, path: path}];
        let results = [];

        while (frontier.length > 0) {
            current = frontier.pop();
            for (let key in current.node) {
                if (key != "END") {
                    path = current.path + key;
                    frontier.push({node: current.node[key], path: path});
                }
                else if (current.node.END){
                    results.push(current.path);
                }
            }
        }

        callback.call(this, results);
    },

    autocomplete: function(input, callback) {
        let current = this._root;

        input.split('')
            .forEach(element => {
            if (typeof current[element] !== "undefined") {
                current = current[element];
            }
        });
        let results;
        this.breadthFirstSearch(current, output => {
            output = output.map(element => input + element);
            results = output
        });
        callback.call(this, results);
    }
};

const TrieTest = new Trie();

TrieTest.add("ass");
TrieTest.add("as");
TrieTest.add("a");
TrieTest.add("the");
TrieTest.add("dog");
TrieTest.add("jumped");
TrieTest.add("over");
TrieTest.add("the");
TrieTest.add("moon");
TrieTest.add("mongo");
TrieTest.add("mongoose");
TrieTest.add("doggie");
TrieTest.add("leave");
TrieTest.add("leaf");

TrieTest.depthFirstSearch((results) => {
    console.log(results);
});

/*TrieTest.breadthFirstSearch((null, results) => {
    console.log(results);
});*/

TrieTest.autocomplete("mo", results => console.log(results));