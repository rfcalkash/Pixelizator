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
    int halfStep=pSize/2;
    bool is_edge=false;
    for(int x=max(0,int(pPos.x)-halfStep);x<=min(INPUT_SIZE.x,int(pPos.x)+halfStep);x++){
        for(int y=max(0,int(pPos.y)-halfStep);y<=min(INPUT_SIZE.y,int(pPos.y)+halfStep);y++){
            if(pow(x,2)+pow(y,2)<=pow(halfStep,2)){
                if(hasEdge(vec2(x,y)/INPUT_SIZE)){
                    is_edge=true;
                    break;
                }
            }
        }
        if(is_edge){
            break;
        }
    }
    FRAGCOLOR=is_edge?texture(INPUT,INPUT_UV):vec4(0,0,0,1);

}
