import { MongoClient } from 'mongodb'

class Mongo {
  dbname = 'SendsAccessSystem'
  url = 'mongodb://xxx'
  conn = null

  async start () {
    const conn = await MongoClient.connect(this.url)
    this.conn = conn
  }

  async use (collectionname) {
    return await this.conn.db(this.dbname).collection(collectionname)
  }

  end () {
    if (this.conn != null) this.conn.close()
  }
}

export default Mongo
