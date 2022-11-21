/*边表*/
class Edge{
    constructor(from = -1, to = -1, weight = 0) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}
/*图*/
const UNVISTED = 0;
const VISTED = 1;
const INFINITY = 9999;
class Graph{
    constructor(numVertex) {
        this.numVertex = numVertex;
        this.numEdge = 0;
        this.Indegree = new Array(numVertex);//存放图的顶点初值为0
        this.Mark = new Array(numVertex);//标记图的顶点是否被访问过处值为未访问过
        this.graList = new Array(numVertex);//存放图的边信息
        for(var i = 0; i < numVertex; i++){
            this.graList[i] = new Array(numVertex);
            this.Mark[i] = UNVISTED;
            this.Indegree[i] = 0;
            for(var j = 0; j < numVertex; j++){
                this.graList[i][j] = INFINITY;
                if(i == j){
                    this.graList[i][j] = 0;
                }
            }
        }
    }
    //获得当前图的顶点个数
    VerticesNum(){
        return this.numVertex;
    }
    //判断oneEdge是否为边
    IsEdge(oneEdge){
        if(oneEdge.weight > 0 && oneEdge.weight < INFINITY && oneEdge.to >= 0){return true;}
        return false;
    }
    //返回依附于某一点的第一条边
    FirstEdge(oneVertex){
        var myEdge = new Edge();
        for(var i = 0; i < this.VerticesNum(); i++){
            if(this.graList[oneVertex][i] < INFINITY && this.graList[oneVertex][i] > 0){
                myEdge.from = oneVertex;
                myEdge.to = i;
                myEdge.weight = this.graList[oneVertex][i];
                return myEdge;
            }
        }
        return myEdge;
    }
    //返回该条边顶点的下一条边
    NextEdge(preEdge){
        var myEdge = new Edge();
        for(var i = preEdge.to + 1; i < this.VerticesNum(); i++){
            if(this.graList[preEdge.from][i] < INFINITY && this.graList[preEdge.from][i] > 0){
                myEdge.from =preEdge.from;
                myEdge.to = i;
                myEdge.weight = this.graList[preEdge.from][i];
                return myEdge;
            }
        }
        return myEdge
    }
    //为图设置一条边
    setEdge(from, to, weight){
        this.graList[from][to] = weight;
        this.graList[to][from] = weight;
    }
}
/*距离类*/
class Dist{
    constructor(length = INFINITY, pre = -1) {
        this.length = length
        this.pre = pre
    }
}

/*某一点是否在数组中*/
function iscunzai(v,vv){
    for(var i = 0; i < v.length; i++){
        if(Number(vv) == Number(v[i])){
            return 0;
        }
    }
    return 1;
}

/* 弗洛伊德算法 */
function Floyd (g, V){
    var d = new Array(g.VerticesNum());
    var i, j, v;
    for(i = 0; i < g.VerticesNum(); i++){
        d[i] = new Array(g.VerticesNum());
    }
    for(i = 0; i < g.VerticesNum(); i++){
        for(j = 0; j < g.VerticesNum(); j++){
            d[i][j] = new Dist();
        }
    }
    //初始化数组D
    for(i = 0; i < g.VerticesNum(); i++){
        for(j = 0; j < g.VerticesNum(); j++){
            if(i == j){
                d[i][j].length = 0;
                d[i][j].pre = i;
            }
            else{
                d[i][j].length = INFINITY;
                d[i][j].pre = -1;
            }
        }
    }
    for(v = 0; v < g.VerticesNum(); v++){
        for(var e = g.FirstEdge(v); g.IsEdge(e); e = g.NextEdge(e)){
            d[v][e.to].length = e.weight;
            d[v][e.to].pre = v;
        }
    }
    //更新路径长度
    for(v = 0; v < g.VerticesNum(); v++){
        for (i = 0; i < g.VerticesNum(); i++){
            for (j = 0; j < g.VerticesNum(); j++){
                if(d[i][j].length > (d[i][v].length + d[v][j].length) && iscunzai(s1,v) == 1){
                    if(iscunzai(V,v) == 1){
                        d[i][j].length = d[i][v].length + d[v][j].length;
                        d[i][j].pre = v;
                    }
                }
            }
        }
    }
    return d
}

/*根据路径计算距离*/
function long(g,stack){ //这里使用栈的思想
    var v = [];
    var start = Number(stack[0]);
    var to;
    var length = 0;
    for(var i = 1; i < stack.length; i++){
        v.push(start);
        to = Number(stack[i]);
        length = length + Floyd(g,v)[start][to].length;
        while(1){
            var temp = Number(Floyd(g,v)[start][to].pre);
            if(temp == start){break;}
            if(temp == -1){length = 9999; break;}
            v.push(temp);
            to = temp;
        }
        to = Number(stack[i]);
        start = to;
    }
    return length;
}

/*回溯算法*/
function ret(g, v, start, to){
    var dd = [];
    var t;
    if(start > to){
        t = start;
        start = to;
        to = t;
    }
    while(1) {
        var temp = Floyd(g, v)[start][to].pre
        if (temp == start) {
            break;
        }
        dd.unshift(Number(temp));
        v.push(temp);
        to = temp;
    }
    return dd;
}
function R(stack, g){
    var start = Number(stack[0]);
    var to;
    var lujin = [];
    var v = [];
    lujin.push(Number(start));
    for(var i = 1; i < stack.length - 1; i++){
        v.push(start);
        to = Number(stack[i]);
        if(Floyd(g,v)[start][to].pre != start){
            var f = ret(g, v,start,to);
            var str = "("+f+")";
            if(start > to){str = "("+f.reverse()+")";}
            lujin.push(str);
        }
        lujin.push(Number(to));
        start = to;
    }
    var temp_p =Floyd(g,v)[stack[stack.length - 2]][v0].pre
    if(temp_p != stack[stack.length - 1]){
        if(stack.length == 3 && G.graList[stack[0]][stack[1]] < 999){
            g.setEdge(stack[0],stack[1],9999);
        }
        var ff = ret(g, v,v0,stack[stack.length - 2]);
        if(v0 > stack[stack.length - 2]){
            str1 = "("+ff+")";
        }
        else {var str1 = "("+ff.reverse()+")";}
        str1 = str1 +   "," + v0;
        lujin.push(str1);
        aaa();
    }

    return lujin;
}


/*TSP旅行商问题求解*/
function TSP(g, array, stack, result, v0){
    if(array.length == 0){
            var stack1 =JSON.parse(JSON.stringify(stack));
            stack1.push(stack1[0]);
            var length = long(g, stack1);
            if(length < result[0] && stack[0]== v0) {
                console.log(stack1);
                result[0] = length;
                result[1] = JSON.parse(JSON.stringify(R(stack1, g).toString()));
            }
    }
    else{
        for(var i = 0; i < array.length; i++){
            var temp = array.splice(i,1);
            stack.push(Number(temp));
            var tempArray = JSON.parse(JSON.stringify(array));//注意深浅拷贝的区别
            array.splice(i,0,temp);
            result = TSP(g, tempArray, stack, result, v0);
            stack.pop();
        }
    }
    return result;
}

var turnNum = function(nums){
    return nums.map(Number);
}


/*主函数*/
//图结构存储
var G = new Graph(10);
function aaa(){
    G.setEdge(0,1,36);
    G.setEdge(0,2,27);
    G.setEdge(1,2,27);
    G.setEdge(1,3,18);
    G.setEdge(1,4,20);
    G.setEdge(2,4,12);
    G.setEdge(2,5,23);
    G.setEdge(3,6,11);
    G.setEdge(3,7,32);
    G.setEdge(4,3,16);
    G.setEdge(4,5,30);
    G.setEdge(5,6,12);
    G.setEdge(5,8,38);
    G.setEdge(6,7,20);
    G.setEdge(6,8,32);
    G.setEdge(7,8,15);
    G.setEdge(7,9,24);
    G.setEdge(8,9,13);
}

aaa();


/*旅行商问题校验*/
var S = [0,9];
var s1 = JSON.parse(JSON.stringify(S));
var D = new Array();
var result = [INFINITY,0];
var v0 = 9;
result = TSP(G,S,D,result,v0);
console.log(result);
