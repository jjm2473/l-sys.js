
var ROUND = 2*Math.PI;

function CanvasDrawer(context2d){
    var ctx = context2d;
    this.drawLine = function(start_x, start_y, end_x, end_y, width){
        ctx.save();
        ctx.moveTo(start_x, start_y);
        ctx.lineWidth = width;
        ctx.lineTo(end_x, end_y);
        ctx.stroke();
        ctx.restore();
    };

    this.drawPoint = function(x, y, r){
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, ROUND);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';
}

function LSys(){
    this.__proto__ = new LContext();
    this.draw = function(drawer){
        var str = this.atom, tmp, tmpc;
        var i = 0, j = 0, l = 0, nx, ny;
        for(i=0;i<this.depth;++i){
            l = str.length;
            tmp = '';
            for(j=0;j<l;++j){
                tmpc = str.charAt(j);
                if(this.map.hasOwnProperty(tmpc)){
                    tmp += this.map[tmpc];
                }else{
                    tmp += tmpc;
                }
            }
            str = tmp;
        }

        this.frame = new LFrame(this.base);
        l = str.length;
        for(j=0;j<l;++j){
            tmpc = str.charAt(j);
            if((tmpc >= 'a' && tmpc <= 'z') || (tmpc >= 'A' && tmpc <= 'Z')){
                nx = Math.cos(this.frame.a) * this.frame.l + this.frame.x;
                ny = Math.sin(this.frame.a) * this.frame.l + this.frame.y;
                if(tmpc < 'a'){
                    drawer.drawLine(this.frame.x, this.frame.y, nx, ny, this.frame.w);
                }
                this.frame.x = nx;
                this.frame.y = ny;
                continue;
            }
            switch(tmpc){
                case '[':
                    this.push();break;
                case ']':
                    this.pop();break;
                case '+':
                    this.frame.a += this.frame.aa;break;
                case '-':
                    this.frame.a -= this.frame.aa;break;
                case '|':
                    this.frame.a += Math.PI;break;
                case '#':
                    this.frame.w += this.wa;break;
                case '!':
                    this.frame.w -= this.wa;break;
                case '@':
                    drawer.drawPoint(this.frame.x, this.frame.y, this.frame.w);break;
                case '>':
                    this.frame.l *= this.lm;break;
                case '<':
                    this.frame.l /= this.lm;break;
                case '&':
                    this.frame.aa *= -1;break;
                case '(':
                    this.frame.aa -= this.aaa;break;
                case ')':
                    this.frame.aa += this.aaa;break;
                default:
                    console.error('unknown instruction \'{}\'', tmpc);
            }
        }
        if(this.stack.length != 0){
            console.debug('stack not empty at end:{}', this.stack.length);
            this.stack = [];
        }
    };
}

function LContext(){
    this.stack = [];
    this.aaa = 0;//角度增量的增量
    this.wa = 0;//宽度增量
    this.lm = 1;//线长增量比
    this.base = new LFrame(null);
    this.frame = null;
    this.atom = '';
    this.map = {};
    this.depth = 1;
    this.push = function(){
        this.stack.push(new LFrame(this.frame));
    };
    this.pop = function(){
        this.frame = this.stack.pop();
    };

}

function LFrame(other){
    this.x = other?other.x:0;//当前x
    this.y = other?other.y:0;//当前y
    this.a = other?other.a:0;//方向
    this.w = other?other.w:0;//线宽
    this.l = other?other.l:0;//线长
    this.aa = other?other.aa:0;//角度增量
}

