
var path = require('path');
var fs = require('fs');

function readRecursively(dir) {
	var files = fs.readdirSync(dir);
	return files.reduce(function (allFiles, file) {

		if (!fs.statSync(path.join(dir, file)).isDirectory()) {
			allFiles.push(path.join(dir, file));

		} else {
			var files = readRecursively(path.join(dir, file));
			allFiles = allFiles.concat(files);
		}
		return allFiles;
	}, []);
}

var files = readRecursively('./specs');
files = files.concat(readRecursively('./drafts'));
files = files.concat(readRecursively('./outdated'));

files.forEach(function (file) {
	var text = fs.readFileSync(file, 'utf-8');

	text = '\n# '+ file.replace('.md', '') + ' \n\n' + text;

	// var links = text.match(/\[http[^\]]+\]/g);
	// (links || []).forEach(function (oldLink) {
	// 	var stripped = oldLink.substr(1, oldLink.length -2);
	// 	var bits = stripped.split(/[|\s]+/g);
	// 	if (bits.length >= 2) {
	// 		var link = bits.shift();
	// 		var newLink = '[' + bits.join(' ') + '](' + link + ')';
	// 		text = text.replace(oldLink, newLink);
	// 	}
	// });

	fs.writeFileSync(file, text);
});
