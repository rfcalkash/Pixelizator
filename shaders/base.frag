void MAIN()
{
    vec2 pPos=INPUT_UV*INPUT_SIZE;
    int halfStep=int(pSize)/2;
    bool is_edge=false;
    if(halfStep<=0){
        float currentPCol = texture(DEPTH_TEXTURE,INPUT_UV).r;
        is_edge=abs(texture(DEPTH_TEXTURE,(pPos-vec2(1,0))/INPUT_SIZE).r-currentPCol)>edgeAmount ||
                abs(texture(DEPTH_TEXTURE,(pPos-vec2(0,1))/INPUT_SIZE).r-currentPCol)>edgeAmount;
    }
    else{
        float dMax=0.0;
        float dMin=1.0;
        for(int x=max(0,int(pPos.x)-halfStep);x<=min(INPUT_SIZE.x,int(pPos.x)+halfStep);x++){
            for(int y=max(0,int(pPos.y)-halfStep);y<=min(INPUT_SIZE.y,int(pPos.y)+halfStep);y++){
                vec4 dCol=texture(DEPTH_TEXTURE,vec2(x,y)/INPUT_SIZE);
                dMax=max(dMax,dCol.r);
                dMin=min(dMin,dCol.r);
                if(dMax-dMin>edgeAmount){
                    is_edge=true;
                    break;
                }
            }
            if(is_edge){
                break;
            }
        }
    }
    FRAGCOLOR=is_edge?vec4(1,1,1,1):texture(INPUT,INPUT_UV);

}
