import { exec } from 'child_process';

const listadoUsuarios = async() => {
  const ejecucion = await new Promise((resolve, reject) => {
    exec('cat /etc/passwd', (error, stdout, stderr) => {
      if (error) {
        console.error(error, stderr);
        reject(error);
      }
      resolve(stdout);
    });
  });

  const listadoUsuariosRaw = ejecucion.split('\n').map((e) => e.split(':'));

  const resultado = listadoUsuariosRaw
    .filter((item) => item[0])
    .map((item) => {
      const [userName, , idUser, idGroup] = item;
      return {
        idUser: Number(idUser),
        idGroup: Number(idGroup),
        userName,
        label: userName,
        value: Number(idUser),
      };
    });

  return resultado;
};
export default listadoUsuarios;
