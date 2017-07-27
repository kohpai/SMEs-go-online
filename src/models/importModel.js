'use strict'


// import
import DB from '../db.js';

const timeout = 20000;

const addImport = (ts, type, filename, user_id, done) => {
    var importInfo = {
        import_id: ts,
        import_type: type,
        import_filename: filename,
        create_datetime: new Date(),
        user_id: user_id,
    };
    var queryOption = {
        sql: 'INSERT INTO import SET ?',
        timeout: timeout, // 20s
        values: [importInfo],
    };

    DB.get().query(queryOption, function(error, results, fields) {
        if (error) {
            return done(error);
        } else {
            return done(results);
        }
    });
}

const addImportDetail = (ts, row, result, error, done) => {
    console.log(ts+':'+row+':'+result)
    var importDetailInfo = {
        import_id: ts,
        import_row: row,
        result: result,
        error: error,
        update_datetime: new Date(),
    };
    var queryOption = {
        sql: 'INSERT INTO import_detail SET ?',
        timeout: timeout, // 20s
        values: [importDetailInfo],
    };

    DB.get().query(queryOption, function(error, results, fields) {
        if (error) {
            return done(error);
        } else {
            return done(results);
        }
    });
}

const getImport = (id, done) => {
    var queryOption = {
        sql: 'SELECT * FROM import WHERE import_id = ?;',
        timeout: timeout, // 20s
        values: [id],
    };

    DB.get().query(queryOption, function(error, import_result, fields) {
        if (error) {
            return done(error);
        } else {

            if(import_result)

            var queryOption = {
                sql: 'SELECT * FROM import_detail WHERE import_id = ?;',
                timeout: timeout, // 20s
                values: [id],
            };

            DB.get().query(queryOption, function(error, import_detail_result, fields) {
                if (error) {
                    return done(error);
                } else {

                    import_result.rows = import_detail_result
                    return done(import_result)
                }
            })
        }
    });
}

export default {
    addImport,
    addImportDetail,
    getImport,
}