module.exports = {
  

  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function () {
    math = require('mathjs');
    //if (this.req.me) {
    //  throw {redirect:'/welcome'};
    //}

    function getMathScope(stats) {
      //TODO: Optimize this
      var foo = {};
      for (bar of stats){
        foo[bar.name] = bar.value;
      }
      return foo;
    }

    var subscriptions = [];
    var statNameRegexes = {};
    var somethingIsDirty = true;
    var statComputeIterations = 0;
    var stats = await Stat.find().populate('modifiers');

    //Set the current value equal to base to start
    //Might as well create some regex searches while we're at it
    for (stat of stats) {
      stat.dirty = true;
      statNameRegexes[stat.name] = RegExp('\\b'+stat.name+'\\b',"i");
      subscriptions[stat.name] = [];
    }
    
    //Modify stats based on modifiers until nothing is dirty
    while (somethingIsDirty && statComputeIterations < 1000) {
      console.log("looping");
      //console.log(subscriptions);
      //console.log(stats);
      somethingIsDirty = false;
      statComputeIterations++;
      for (stat of stats) {
        if (stat.dirty) {
          console.log(stat.name + " was dirty, recalculating!");
          stat.dirty = false;
          stat.value = stat.baseValue;
          for (modifier of stat.modifiers) {
            
            for ([name, regex] of Object.entries(statNameRegexes))
              if (regex.test(modifier.statMod))
                if (subscriptions[name].indexOf(stat) === -1) {
                  subscriptions[name].push(stat);
                  console.log(stat.name +" is subscribing to "+name);
                }
            console.log("Setting value for "+stat.name);
            stat.value += math.compile(modifier.statMod).evaluate(getMathScope(stats));
            console.log("Set value for "+stat.name);
            
            //Check to see if any other stats have subscribed to me and mark them for recalculation
            console.log("Checking subscriptions for "+stat.name);
            if (subscriptions[stat.name]) {
              somethingIsDirty = true;
              for (dirtyStat of subscriptions[stat.name]) {
                dirtyStat.dirty = true;
                console.log(stat.name+" is marking "+dirtyStat.name+" as dirty.");
              }
            }
          }
        }
      }
      console.log("Ending loop");
      //console.log(subscriptions);
      //console.log(stats);
    }


    //return {AC: AC.baseValue};
    return {stats};

  }


};
