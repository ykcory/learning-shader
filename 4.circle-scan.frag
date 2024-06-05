#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define RANGE(a,b,x)(step(a,x)*(1.-step(b,x)))
#define RS(a,b,x)(smoothstep(a-1.,a+1.,x)*(1.-smoothstep(b-1.,b+1.,x)))
#define PI 3.1415926535897932384626433832795

#define blue1 vec3(.74,.95,1.)
#define blue2 vec3(.87,.98,1.)
#define blue3 vec3(.35,.76,.83)
#define blue4 vec3(.953,.969,.89)
#define red vec3(1.,.38,.227)

mat2 rotate(float angle){
  return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

// 改直线为射线 这次的思路是先画一条九点钟方向的射线 然后偏移 这里的偏移仅仅是旋转
// 先把当前坐标 逆偏移到 三点钟方向
float ray(vec2 st,float angle,float r,float w){
  st*=rotate(-angle);
  return length(st)<r&&st.x>0.?smoothstep(w,0.,abs(st.y)):.0;
}

float sector2(vec2 st,float r,float endAng,float offset){
  float d=length(st);
  // 余弦值的值域比较好控制 就用它,还是直接用反三角函数算了
  float cosVal=st.y/d;// 把这个d变成r ，结果就是扇形减去三角形剩余圆弧
  float ang=acos(cosVal);
  if(st.x<0.)ang=2.*PI-ang;
  // 同样 这个偏移要逆着用
  ang-=offset;
  // 我逻辑是比较角度大小 所以小于零要处理   有while 但是我写了错了
  ang=mod(ang,2.*PI);
  if(ang<0.)ang+=2.*PI;
  // 渐变 就是百分比
  float percent=ang/endAng;
  return d<r&&ang<endAng?percent:0.;
}

float circle(vec2 st,float radius,float width){
  float st_to_center=length(st);
  // 外边界（0-1）
  float outSide=smoothstep(radius+width/2.,radius,st_to_center);
  // 内边界（0-1）
  float inSide=smoothstep(radius,radius-width/2.,st_to_center);
  return outSide-inSide;
}

void main(){
  float t=u_time*3.;
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st-=vec2(.5);
  vec2 center=vec2(.5,.5);
  vec3 finalColor=vec3(0.);
  finalColor=mix(finalColor,blue1,circle(st,.03,.002));
  finalColor=mix(finalColor,blue1,circle(st,.15,.002));
  finalColor=mix(finalColor,blue1,circle(st,.25,.002));
  finalColor+=circle(st,.35,.005);
  
  finalColor=mix(finalColor,blue3,ray(st,-t,.35,.005));
  // 扇形  和射线初始偏差是 90  ，然后用90 - 扇形的弧度   扫描的位置等于初始 12点 + 扇形弧度 + 旋转量
  // finalColor=mix(finalColor, blue3, sector2(st,0.35, PI/2.5, t+PI/2. - PI/2.5 )) ;
  finalColor=mix(finalColor,blue3,sector2(st,.35,PI/2.5,t+PI/2.-PI/2.5));
  
  gl_FragColor=vec4(finalColor,1.);
}