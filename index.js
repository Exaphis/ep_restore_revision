const eejs = require("ep_etherpad-lite/node/eejs/");

console.log('in restore index.js');

exports.eejsBlock_timesliderEditbarRight = function (hook_name, args, cb) {
    console.log('timeslidereditbarright called');
    args.content += eejs.require("ep_restore_revision/templates/editbarButtons.ejs", {pad: args.renderContext.req.params.pad}, module);
    return cb();
};

exports.eejsBlock_timesliderScripts = function (hook_name, args, cb) {
    console.log('timesliderscripts called');
    args.content += eejs.require("ep_restore_revision/templates/scripts.ejs", {}, module);
    return cb();
};

exports.expressCreateServer = function (hook_name, args, cb) {
    const hasPadAccess = require("ep_etherpad-lite/node/padaccess");
    const api = require("ep_etherpad-lite/node/db/API");

   args.app.get('/restore/:padId/:rev', async (req, res) => {
       console.log('restore endpoint called');
       const padID = req.params.padId;
       req.params.pad = padID;

       if (padID.indexOf("r.") === 0) {
         res.send('Permission denied!');
         return;
       }

       if (await hasPadAccess(req, res)) {
           console.log('restoring revision using api...');
           await api.restoreRevision(padID, req.params.rev);

               //if(err){
               //    res.send(err.message);
               //    return;
               //}

           res.redirect(307, '/p/'+req.params.padId);
       }

     });

    args.app.get('/apples', function(req, res) {
      res.send("<em>Abra cadabra</em>");
    });

    return cb();
};
