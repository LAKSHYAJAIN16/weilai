import React from 'react'

export default function Update() {
    return (
        <>
            <div className="main">
                <p className="mainText">Update 1.1 Now Released!</p>
                <p className="description">More Cards, Cleaner UI, among other changes. Read the Patch Notes <a href="/updates/1-1" className="link">here</a></p>
            </div>
            <style jsx>
                {`
                .main{
                    width:100vw;
                    height:70px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                    background-color:rgba(255, 79, 94, 0.7);
                }

                .mainText{
                    font-size:1.2em;
                    font-weight:bold;
                }

                .description{
                    font-size:1em;
                    margin-top:-20px;
                }

                .link{
                    text-decoration:none;
                    color:lightblue;
                    transition: all 300ms ease;
                }

                .link:hover{
                    color:darkblue;
                }
                
                @media only screen and (max-width: 590px) {
                    .mainText{
                        font-size:1em;
                    }

                    .description{
                        font-size:0.8em;
                        margin-top:-10px;
                        padding-left:10px;
                    }
                }

                @media only screen and (max-width: 380px) {
                    .mainText{
                        font-size:0.8em;
                    }

                    .description{
                        font-size:0.6em;
                        margin-top:-10px;
                        padding-left:10px;
                    }
                }
                `}
            </style>
        </>
    )
}
