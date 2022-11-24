const child_process = require('child_process');
const fs = require('fs-extra');
const handlebars = require('handlebars');
const walkSync = require('walk-sync');
const yaml = require('js-yaml');

const { images } = yaml.load(fs.readFileSync('images.yml', 'utf8'));

const command = process.argv[2];

if (command === 'generate') {
  images.forEach(image => {
    const { src, dest, context } = image;
    fs.removeSync(dest);
    fs.mkdirpSync(dest);
    walkSync(src, { directories: false }).forEach(file => {
      const template = handlebars.compile(fs.readFileSync(`${src}/${file}`, 'utf8'));
      const output = template(context);
      fs.outputFileSync(`${dest}/${file}`, output);
    });
    console.log(`Generated ${dest}.`);
  });
} else if (command === 'build') {
  images.forEach(image => {
    const { name, tags, dest } = image;
    tags.forEach(tag => {
      console.log(`Building ${name}:${tag}...`)
      const stdout = child_process.execSync(`docker build -q -t ${name}:${tag} ${dest}`);
      console.log(stdout.toString());
    });
  });
} else if (command === 'push') {
  images.forEach(image => {
    const { name, tags } = image;
    tags.forEach(tag => {
      console.log(`Pushing ${name}:${tag}...`)
      const stdout = child_process.execSync(`docker push -q ${name}:${tag}`);
      console.log(stdout.toString());
    });
  });
}
