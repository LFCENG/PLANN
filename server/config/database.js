var dbPath = process.env.MONGOLAB_URI ||'mongodb://localhost/nodebackbone';

module.exports = {
    'secret': 'PLANN279867',
    'database': dbPath
}
