import React from 'react';
function Caurosel(){
    return(
       <div>
           <div className="container-fluid">
            <div id="carouselExampleInterval" className="carousel slide carousel-fade m-2" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="1000">
                        <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/38_inr.png" className="d-block w-100" alt="pic1"/>
                    </div>
                    <div className="carousel-item" data-bs-interval="1000">
                        <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/41_inr.png" className="d-block w-100" alt="pic2"/>
                    </div>
                    <div className="carousel-item" data-bs-interval="1000">
                        <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/40_inr.png" className="d-block w-100" alt="pic3"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    {/* <span className="visually-hidden"></span> */}
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    {/* <span classn="visually-hidden"></span> */}
                </button>
        </div>
        </div>

     </div>
        
            )
           }
export default Caurosel