
import path from 'path';
import fs from 'fs';

/**
 * all files in dir
 */
const fileList = function getFileList(dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    if (isDir) return list;
    list.push(file);
    return list;
  }, []);
};

/**
 * crate component folder in src/components
 */
async function generate() {
  let componentName = process.argv[3] || '';
  if (componentName.length === 0) {
    console.log('Error: Specify component name, for example: npm run generate todo');
    return;
  }

  // fix component name
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const componentPath = path.join('src/components', componentName);

  fs.exists(componentPath, (isDirExist) => {
    if (isDirExist) {
      console.log(`Error: Component "${componentPath}" alredy exist `
        `choise another component name`);
      return;
    }

    fs.mkdir(componentPath, () => {
      const templatePath = path.join('tools', 'templates', 'component');

      // foreach template
      fileList(templatePath)
      .forEach((fileName) => {
        fs.readFile(path.join(templatePath, fileName), 'utf-8', (err, data) => {
          const newFileName = fileName.replace(/\.js\.template/, '.js')
            .replace('Component', componentName);

          fs.writeFile(
            path.join(componentPath, newFileName),
            data.replace(/##Component##/g, componentName)
          );
        });
      });
    });
  });
}

export default generate;
