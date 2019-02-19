const fs = require('fs-extra');
const path = require('path');
const cli = require('./cli-parse.js');
const replace = require('replace');

const DEFAULT_PATH = 'src/components';

const commands = [
  {
    name: 'help',
    string: ['-h', '--help'],
    description: 'Prints a list of all the commands',
    params: [],
    default: false
  },
  {
    name: 'name',
    string: ['-n', '--name'],
    description: 'The name of the component to be used. No spaces and in Camel Case',
    params: ['string'],
    modify: [function slugify(param) {
      return param.replace(/[^A-Za-z]/gi, '');
    }],
    default: ''
  },
  {
    name: 'path',
    string: ['-p', '--path'],
    description: 'Where to output the new component',
    params: ['string'],
    default: DEFAULT_PATH
  },
  {
    name: 'noscss',
    string: ['--no-scss'],
    description: 'Will not add a scss require',
    params: [],
    default: false
  },
  {
    name: 'type',
    string: ['-t', '--type'],
    description: 'Defines the component type. presentation | smart | dumb',
    params: ['string'],
    default: 'presentation'
  }
];

const defaultArgs = cli.getDefaultArgs(commands);

// Execute here
const parsedArgs = cli.parseArguments(commands);

const _args = Object.assign({}, defaultArgs, parsedArgs);

if (_args.help) {
  console.log(cli.printCommands(commands));
  process.exit();
}

if (_args.name.trim() == '') {
  console.error('No name passed for component');
  process.exit();
}

const NAME = _args.name;
const LOWER = NAME.toLowerCase();

const ROOT = path.join(__dirname, '..');
const OUTPUT = (_args.path !== DEFAULT_PATH) ? path.join(ROOT, _args.path) : path.join(ROOT, _args.path, NAME);

fs.stat(OUTPUT, (err, stats) => {
  if (err || !stats.isDirectory()) {
    if (OUTPUT.substr(NAME.length * -1) !== NAME) {
      console.error('Output path is not a directory');
      return false;
    }
  }

  fs.copy(path.join(__dirname, 'Component'), OUTPUT, (err) => {
    if (err) {
      throw err;
    }

    switch (_args.type) {
      case 'smart':
        fs.renameSync(path.join(OUTPUT, 'Component.js'), path.join(OUTPUT, NAME + '.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component-presentation.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component-dumb.js'));
        break;
      case 'dumb':
        fs.renameSync(path.join(OUTPUT, 'Component-dumb.js'), path.join(OUTPUT, NAME + '.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component-presentation.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component.js'));
        break;
      case 'presentation':
      default:
        fs.renameSync(path.join(OUTPUT, 'Component-presentation.js'), path.join(OUTPUT, NAME + '.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component-dumb.js'));
        fs.unlinkSync(path.join(OUTPUT, 'Component.js'));
        break;
    }

    if (_args.noscss) {
      fs.unlinkSync(path.join(OUTPUT, 'Component.scss'));
    } else {
      fs.renameSync(path.join(OUTPUT, 'Component.scss'), path.join(OUTPUT, NAME + '.scss'));
    }

    replace({
      regex: 'SCSS',
      replacement: _args.noscss ? '' : `import "./${NAME}.scss";`,
      paths: [OUTPUT],
      recursive: true,
      silent: true,
    });
    replace({
      regex: 'NAME',
      replacement: NAME,
      paths: [OUTPUT],
      recursive: true,
      silent: true,
    });
    replace({
      regex: 'LOWER',
      replacement: LOWER,
      paths: [OUTPUT],
      recursive: true,
      silent: true,
    });
  });
});

