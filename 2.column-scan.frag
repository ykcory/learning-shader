#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  float scan_width=.5;
  float scan_pos=mod(u_time,1.3);
  
  float pct=smoothstep(scan_pos-scan_width,scan_pos,st.x);
  
  float sub=step(scan_pos,st.x);
  
  gl_FragColor=vec4(1.,1.-pct+sub,1.-pct+sub,1.);
}