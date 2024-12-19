import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }:{src:string,isPlaying:boolean}) {
  const ref = useRef<any>(null);
  const [name,setName] = useState<any>(0);
  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()',name);
      ref.current.play();
    } else {
      console.log('调用 video.pause()',name);
      ref.current.pause();
    }
    return ()=>{
      console.log('卸载 video.pause()',name);
    }
  }, [isPlaying]);

  return (
    <>
    <video ref={ref} src={src} loop playsInline />
    <button onClick={()=>{setName(name+1)}}>设置{name}</button>
    </>
  )
}

export default VideoPlayer
