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

function ab(v, result){
    if(v.length > result){
        return 0;
    }
    var flag = 1;
    for(var i = 0; i < v.length; i++){
        if(iscunzai (result, v[i])){
            return 0;
        }
    }
    return 1;
}

var Mark = new Array(10);
for(var i =0; i < 10 ; i++){
    Mark[i] = new Array(10);
}
for(var i =0; i < 10 ; i++){
    for(var j =0; j < 10 ; j++){
        Mark[i][j] = 0;
    }
}

/*改进后的旅行商算法*/
function TSP(v, v00, result, v0){
    var d = 999;
    var v1 = v00;
    for(var e = G.FirstEdge(v00); G.IsEdge(e); e = G.NextEdge(e)){
        if(e.weight < d && iscunzai(result,e.to) && Mark[v00][e.to] == 0){
            d = e.weight;
            v1 = e.to;
        }
    }
    Mark[v00][v1] = 1;
    if(result[result.length - 1] == v0){
        if(ab(v,result)){
            return result;
        }
    }
    if(v1 != v00){ //如果v1和v00不是相同的节点，把v1点入栈
        result.push(v1)
        TSP(v,v1,result,v0); //递归调用
    }
    else{
        var temp = result.pop(); //否则让结果出栈
        for(var i = 0; i < 10; i++){
            Mark[temp][i] = 0;
        }
        TSP(v,result[result.length - 1],result,v0); //递归调用
    }
    return result;
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
var result1 = new Array();
var v0 = 0;
result1 = TSP(s1,v0,result1,v0);
result = [0,""];
result[1]=result[1]+v0;
var start1 = v0;
for(var i = 0; i < result1.length; i++){
    if(iscunzai(S,result1[i])){
        result[1] = result[1] + "(" + result1[i] + ")";
    }
    else{
        result[1] = result[1] + result1[i];
    }
    result[0] = result[0] + G.graList[start1][result1[i]];
    start1 = result1[i];
}
console.log(result);