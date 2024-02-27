// Refer from https://qiita.com/zaburo/items/25d07af133b638c90e13
const { Spanner } = require("@google-cloud/spanner");

(async () => {

  //定数設定（環境依存）
  const projectId = "emulator-project";
  const instanceId = "emulator-instance";
  const databaseId = "localdb";

  const spanner = new Spanner({
    projectId: projectId,
  });

  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);

  const query = {
    sql: 'select * from users',
  }

  try {
    const [rows] = await database.run(query);
    rows.forEach(async row => {
      const json = await row.toJSON();
      console.log(`id:${json.id} name:${json.name}`);
    });

  } catch (err) {
    console.error("ERROR", err);
  } finally {
    database.close();
  }

})();
