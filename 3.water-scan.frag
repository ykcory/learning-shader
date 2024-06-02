#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  // 扫描宽度
  float scan_width=.15;
  // 当前圆形半径
  float scan_radius=mod(u_time/3.,0.8);
  
  vec2 st=gl_FragCoord.xy/u_resolution;
  // 当前像素点到圆心距离
  float distance_to_center=distance(st,vec2(.5,.5));
  float pct=smoothstep(scan_radius-scan_width,scan_radius,distance_to_center);
  float color_value = pct-step(scan_radius,distance_to_center);
  
  gl_FragColor=vec4(color_value,0.,0.,color_value);
}