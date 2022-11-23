const child_process = require('child_process');
const fs = require('fs');
const handlebars = require('handlebars');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const yaml = require('js-yaml');

const { images } = yaml.load(fs.readFileSync('images.yml', 'utf8'));

const command = process.argv[2];

if (command === 'generate') {
  images.forEach(image => {
    const { src, dest, context } = image;
    rimraf.sync(dest);
    mkdirp.sync(dest);
    fs.readdirSync(src).forEach(file => {
      const template = handlebars.compile(fs.readFileSync(`${src}/${file}`, 'utf8'));
      const output = template(context);
      fs.writeFileSync(`${dest}/${file}`, output);
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
