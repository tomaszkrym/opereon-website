var folder = String.fromCodePoint(0x1F5C0);
var doc = String.fromCodePoint(0x1F5CE);

function tree_parse(str) {
    let lines = str.split(/[\r\n]+/).filter((line) => line.trim() !== '');
    let nodes = [];
    let indents = [];
    let indent = -1;
    lines.forEach((line) => {
        let value = line.trim();
        /*if (value === '.' || value.endsWith('/')) {
            value = folder + ' ' + value.substr(0, value.length - 1);
        } else {
            value = doc + ' ' + value;
        }*/
        let level = line.length - line.trimStart().length;
        if (indent < level && indents.indexOf(level) < 0) {
            indents.push(level);
            indent = level;
        }
        nodes.push({
            value: value,
            level: level,
            nodes: [],
        })
    });
    nodes.forEach((node) => {
        let level = indents.indexOf(node.level);
        if (level < 0) {
            level = indents.findIndex((i) => i > node.level);
        }
        node.level = level;
    });
    for (let i = 0; i < nodes.length; ++i) {
        let node = nodes[i];
        for (let j = i + 1; j < nodes.length; ++j) {
            let n = nodes[j];
            if (node.level === n.level - 1) {
                node.nodes.push(n);
            } else if (node.level >= n.level) {
                break;
            }
        }
    }
    return nodes[0];
}

var c0 = String.fromCharCode(9500);
var c1 = String.fromCharCode(9472);
var c2 = String.fromCharCode(9492);
var c3 = String.fromCharCode(9474);

function ascii_tree_generate(str) {
    var levels = [];
    var tree = tree_parse(str);
    return _generate(tree, true, levels);
}

function compose(tree, end, levels) {
    var i, ret = '\r\n';
    var c = end ? c2 : c0;

    if (tree.level == 0) {
        return tree.value;
    }

    for (i = 1; i < tree.level; ++i) {
        ret += levels[i] ? ' ' : c3
        ret += '  ';
    }

    return ret + c + c1 + ' ' + tree.value;
}

function _generate(tree, end, levels) {
    var last;
    var result = compose(tree, end, levels);

    if (tree.nodes) {
        last = tree.nodes.length - 1;
        tree.nodes.forEach(function(subTree, index) {
            levels[subTree.level] = index == last;
            result += _generate(subTree, index == last, levels);
        });
    }

    return result;
}

