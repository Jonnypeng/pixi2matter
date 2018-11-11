var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = init;
function init() {
    var world;
    matter();
    pixi();
    function matter() {
        var engine = Matter.Engine.create();
        world = engine.world;
        var render = Matter.Render.create({
            "engine": engine,
            "element": document.getElementById("matterRender"),
            "options": {
                "width": 640,
                "height": 1080,
                "pixelRatio": 1,
                "background": 0x000000,
                "wireframes": true
            }
        });
        var runner = Matter.Runner.create({
            "fps": 60
        });
        Matter.Runner.run(runner, engine);
        Matter.Engine.run(engine);
        //Matter.Render.run(render);
    }
    ;
    function pixi() {
        var app = new PIXI.Application(640, 1080, {
            "view": document.getElementById("pixiRender"),
            "transparent": true,
        });
        var loader = new PIXI.loaders.Loader();
        var icons = [];
        var game = {
            "init": function () {
                loader.add(["images/bg.png", "images/icon.png"]);
                loader.load(game.start);
            },
            "start": function () {
                var bg = PIXI.Sprite.fromImage("images/bg.png");
                app.stage.addChild(bg);
                game.staticRender();
                game.createIcon();
            },
            "staticRender": function () {
                var rect_1 = Matter.Bodies.rectangle(206, 540, 20, 1105, { isStatic: true, angle: (Math.PI / 180) * -14.6 });
                var rect_2 = Matter.Bodies.rectangle(320, 903, 640, 20, { isStatic: true, angle: (Math.PI / 180) * 5 });
                Matter.World.add(world, [rect_1, rect_2]);
            },
            "createIcon": function () {
                var Icon = /** @class */ (function (_super) {
                    __extends(Icon, _super);
                    function Icon(_url, _x, _y) {
                        var _this = _super.call(this) || this;
                        _this.texture = PIXI.Texture.fromImage(_url);
                        _this.x = _x;
                        _this.y = _y;
                        _this.anchor.set(0.5);
                        _this.body = Matter.Bodies.rectangle(_this.x, _this.y, 100, 82);
                        return _this;
                    }
                    return Icon;
                }(PIXI.Sprite));
                for (var i = 0; i < 10; i++) {
                    var _icon = new Icon("images/icon.png", Math.floor(150 + Math.random() * 300), i * 82 * -1);
                    icons.push(_icon);
                    app.stage.addChild(_icon);
                    Matter.World.add(world, _icon.body);
                }
                ;
                game.sync();
            },
            'sync': function () {
                app.ticker.add(p2mRender);
                function p2mRender() {
                    icons.forEach(function (icon) {
                        icon.position.x = icon.body.position.x;
                        icon.position.y = icon.body.position.y;
                        icon.rotation = icon.body.angle;
                    });
                }
                ;
            }
        };
        game.init();
    }
    ;
}
; // init end
