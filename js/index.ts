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
      //Matter.Render.run(render);
    };

    function pixi(){
        var app = new PIXI.Application(640,1080,{
          "view":<any>document.getElementById("pixiRender"),
          "transparent":true,   //=>设置为透明，这样更便于可视下一层画布
        });

        var loader = new PIXI.loaders.Loader();

        var icons = [];

        var game = {
          "init":function (){
            loader.add(["images/bg.png","images/icon.png"]);
            loader.load(game.start);
          },
          "start":function (){
            var bg = PIXI.Sprite.fromImage("images/bg.png");
            app.stage.addChild(bg);

            game.staticRender();
            game.createIcon();
          },
          "staticRender":function (){
            var rect_1 = Matter.Bodies.rectangle(206,540,20,1105,{isStatic:true,angle:(Math.PI/180)*-14.6});
            var rect_2 = Matter.Bodies.rectangle(320,903,640,20,{isStatic:true,angle:(Math.PI/180)*5});

            Matter.World.add(world,[rect_1,rect_2]);
          },
          "createIcon":function (){
            class Icon extends PIXI.Sprite{
              x:number;
              y:number;
              body:any;
              constructor(_url:string,_x:number,_y:number){
                super();
                this.texture = PIXI.Texture.fromImage(_url);
                this.x = _x;
                this.y = _y;
                this.anchor.set(0.5);
                this.body = Matter.Bodies.rectangle(this.x,this.y,100,82);
              }
            }

            for(let i = 0;i < 10;i++){
              let _icon = new Icon("images/icon.png",Math.floor(150 + Math.random()*300),i*82*-1);
              icons.push(_icon);
              app.stage.addChild(_icon);
              Matter.World.add(world,_icon.body);
            };
            game.sync();
          },
          'sync':function (){
              app.ticker.add(p2mRender);
              function p2mRender(){
                icons.forEach(function (icon){
                  icon.position.x = icon.body.position.x;
                  icon.position.y = icon.body.position.y;
                  icon.rotation = icon.body.angle;
                });
              };
          }
        }

        game.init();

    };

  }; // init end
