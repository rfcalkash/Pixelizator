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
            sumColor+=texture(INPUT,stepPos);
        }
    }

    sumColor/=pow(float(pSize),2);
    sumColor=vec4(floor(sumColor.rgb*pDepth)/pDepth,1.0);
    // sumColor.r=floor(sumColor.r*pDepth)/pDepth;
    // sumColor.g=floor(sumColor.g*pDepth)/pDepth;
    // sumColor.b=floor(sumColor.b*pDepth)/pDepth;
    // sumColor.a=1;

    FRAGCOLOR=sumColor;
    // FRAGCOLOR=texture(DEPTH_TEXTURE,INPUT_UV);

}
