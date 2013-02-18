// Server-Sent-Events service
/*  here's the setup in a node.js application:
  streamer = require('./routes/streamer');
  app.get('/stream', streamer.out);
  app.get('/stream/msg', streamer.msg);
  app.get('/stream/:event_name', streamer.in);
*/
//  see streamer_server_side.js for a back-end example

.service('Stream', function($http, $log, $window) {
  $log.info('new stream setup');

  function closeHandler() {
    $log.warn('stream closed');
  }

  function openHandler() {
    $log.info('stream opened');
  }

  return {
    init: function(handler) {
      var source = new EventSource('/stream');

      $log.info('stream init');

      source.addEventListener('message', handler, false);
      source.addEventListener('open', openHandler, false);
      source.addEventListener('close', closeHandler, false);
    },
    initMsg: function(handler) {
      var source = new EventSource('/stream/msg');

      $log.info('stream init');

      source.addEventListener('message', handler, false);
    }
  }
});