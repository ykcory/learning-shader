#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st){
    // st 差异小于0.02时，返回1
    return smoothstep(.02,0.,abs(st.y-st.x));
}

void main(){
    // 像素坐标占总屏幕大小 (0,0) - (1,1)
    vec2 st=gl_FragCoord.xy/u_resolution;
    float y=st.x;
    // (0,0,0) - (1,1,1)
    vec3 color=vec3(y);
    // st 差异小于0.02时，返回1
    float pct=plot(st);
    // xy 相等时，加号左侧是 0 ，加号右侧是 1 
    color=(1.-pct)*color+pct*vec3(0.,1.,0.);
    
    gl_FragColor=vec4(color,1.);
}