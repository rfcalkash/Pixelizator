bool hasEdge(vec2 cPos){
    vec4 my_depth=texture(DEPTH_TEXTURE,cPos);
    vec2 pPos=cPos*INPUT_SIZE;
    for(int x=-1;x<=1;x++){
        for(int y=-1;y<=1;y++){
            if(!(x==0 && y==0)){
                vec2 pos=(pPos+vec2(x,y))/INPUT_SIZE;
                if(pos.x>=0 && pos.x<=1 && pos.y>=0 && pos.y<=1 && (texture(DEPTH_TEXTURE,pos)-my_depth).r>edgeAmount){
                    return true;
                }
            }
        }
    }
    return false;
}

void MAIN()
{
    vec2 pPos=INPUT_UV*INPUT_SIZE;
    vec2 pos = floor(pPos/pSize)*pSize/INPUT_SIZE;
    float xStep=1.0/INPUT_SIZE.x;
    float yStep=1.0/INPUT_SIZE.y;
    vec4 sumColor=vec4(0,0,0,0);
    bool is_edge=false;
    for(int x=0;x<pSize;x++){
        for(int y=0;y<pSize;y++){
            vec2 stepPos=pos+vec2(float(x)*xStep,float(y)*yStep);
            if(!is_edge && hasEdge(stepPos)){
                is_edge=true;
            }
            sumColor+=texture(INPUT,stepPos);
        }
    }

    sumColor/=pow(float(pSize),2);
    if(is_edge){
        sumColor*=0.5;
    }
    sumColor=vec4(floor(sumColor.rgb*pDepth)/pDepth,1.0);
    // sumColor.r=floor(sumColor.r*pDepth)/pDepth;
    // sumColor.g=floor(sumColor.g*pDepth)/pDepth;
    // sumColor.b=floor(sumColor.b*pDepth)/pDepth;
    // sumColor.a=1;

    FRAGCOLOR=sumColor;

}
