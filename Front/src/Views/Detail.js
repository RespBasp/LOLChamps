import { useSelector } from "react-redux";
import "./Detail.css"
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Line } from 'rc-progress';
import IndexDetail from "../Components/IndexDetail";

// =================== Img COL1 ========================
const squareImages = require.context('../lol/loading', false, /\.(jpg)$/);
const imageMap = squareImages.keys().reduce((acc, key) => {
  const champId = key.replace(/^\.\/(.*)\.jpg$/, '$1');
  acc[champId] = squareImages(key);
  return acc;
}, {});

//  ===================== Carrousel Col2 ==============
const skinsImages = require.context('../lol/Skins', false, /\.(jpg)$/);

function Col2({ championName }) {

    const skinImageFiles = skinsImages.keys();
  
    const championSkinImages = skinImageFiles
      .filter((filename) => filename.includes(championName))
      console.log(championSkinImages)
  
      const settings = {
        dots: true,            
        infinite: true,        
        speed: 500,            
        slidesToShow: 1,       
        slidesToScroll: 1,     
        autoplay: true,        
        autoplaySpeed: 2000, 
        arrows: true,  
      };

    return (
      <Slider {...settings}>
        {championSkinImages.map((filename, index) => (
          <div key={index}>
            <img src={skinsImages(filename)} alt={championName}  className="Skins"/>
          </div>
        ))}
      </Slider>
    );
  }

  //  ===================== STATS Col3 ==============
  function MyProgressBar({ percent }) {return <Line percent={percent} strokeWidth="2" strokeColor="#FF2019" />;} //Ataque
  function MyProgressBar2({ percent }) {return <Line percent={percent} strokeWidth="2" strokeColor="#1843E3" />;} //Def
  function MyProgressBar3({ percent }) {return <Line percent={percent} strokeWidth="2" strokeColor="#19FFE3" />;} //Magia
  function MyProgressBar4({ percent }) {return <Line percent={percent} strokeWidth="2" strokeColor="#FFF119" />;} //Diff

      //====================== Attacks =========================
    
      const attacksImages = require.context('../lol/Attacks', false, /\.(png)$/);

        const AttackImg = attacksImages.keys().reduce((acc, key) => {
          const champId = key.replace(/^\.\/(.*)\.png$/, '$1');
          acc[champId] = attacksImages(key);
          return acc;
        }, {});


//  ===================== DETAIL  ==============

function Detail (){

    const dataDetail = useSelector((state)=>state.detail);
    const data = Array.isArray(dataDetail) ? dataDetail : [];
    console.log(dataDetail)
    console.log(data)

    return (
      <div>
        <IndexDetail/>

        <div className="detail">
                {/* ============ Campeon ========== */}
            <div className="Col1">
             {data.map((c)=>(
                <div key={c.id}>
                <h1>{c.name}</h1>
                <h2>{c.title}</h2>
                {/* <h3>Class : {c.tags}</h3> */}
                <p>{c.blurb}</p>
                <img src={imageMap[c.id+"_0"]} alt={c.name}></img>
                </div>
                ))}
            </div>

                {/* ============ Skins ========== */}
            <div className="Col2">
                <h1>Skins</h1>
            {data.map((c)=>(
                <Col2 championName={c.id}/>))}
            </div>

                 {/* ============ Stats ========== */}
            <div className="Col3">
            <h1>Stats</h1>
            {data.map((c)=>(
                    <div className="Stats">
                        <h3>Attack</h3>
                        <MyProgressBar percent={c.info.attack*10} />
                        <br></br>
                        <h3>Defense</h3>
                        <MyProgressBar2 percent={c.info.defense*10} />
                        <br></br>
                        <h3>Magic</h3>
                        <MyProgressBar3 percent={c.info.magic*10} />
                        <br></br>
                        <h3>Difficulty</h3>
                        <MyProgressBar4 percent={c.info.difficulty*10} />
                        <div className="Attacks">
                          <br/>
                        <hr/>
                          <h1>Attack moves</h1>
                          <h4>Q<img src={AttackImg[c.id+"Q"]} alt={c.name}/></h4>
                          <h4>W<img src={AttackImg[c.id+"W"]} alt={c.name}/></h4>
                          <h4>E<img src={AttackImg[c.id+"E"]} alt={c.name}/></h4>
                          <h4>R<img src={AttackImg[c.id+"R"]} alt={c.name}/></h4>
                          <h4>Passive <img src={AttackImg[c.id+"_Passive"]} alt="Not Passive"/></h4>
                          <hr/>
                          <h1>Tags</h1>
                          {c.tags ? (
                            c.tags
                              .replace(/[{}]/g, '')
                              .split(',') 
                              .map((tag, index, array) => (
                                <span key={index}>{tag}{index < array.length - 1 ? ' & ' : ''}</span>
                              ))
                          ) : (
                            <span>Not available</span>
                          )}
                        </div>
                    </div>
            ))}
            </div>
        </div>
        </div>
    )
}

export default Detail;