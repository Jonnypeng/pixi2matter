window.onload = init;

function init(){
  let world;

  matter();
  pixi();

  function matter(){
    let engine = Matter.Engine.create();
    world = engine.world;

    let render = Matter.Render.create(
      <any>{
        "engine":engine,
        "element":document.getElementById("matterRender"),
        "options":{
          "width":640,
          "height":1080,
          "pixelRatio":1,
          "background":0x000000,
          "wireframes":true
        }
      });
      let runner = Matter.Runner.create(<any>{
        "fps":60
      });

      Matter.Runner.run(runner,engine);
      Matter.Engine.run(engine);
      Matter.Render.run(render);
    };

    function pixi(){
        var app = new PIXI.Application(640,1080,{
          "view":<any>document.getElementById("pixiRender"),
          "transparent":true,   //=>设置为透明，这样更便于可视下一层画布
        });

        var loader = new PIXI.loaders.Loader();


        var game = {
          "init":function (){
            /* this is loader */
          },
          "start":function (){
            /* this is bgView*/

            game.staticRender();
            game.createView();
          },
          "staticRender":function (){
            /*this is matter.js static view*/
          },
          "createView":function (){
            /*this is pixiView*/
            game.sync();
          },
          'sync':function (){
            /*this is data Sync*/
          }
        }

        game.init();

    };

  }; // init end
