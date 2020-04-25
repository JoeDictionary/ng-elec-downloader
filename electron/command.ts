const { exec } = require('child_process');


export function download(args: string[]) {
  let command = 'test -f';
  args.forEach((element) => {
    command += ' ' + element;
	});
	
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}