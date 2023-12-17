import React from "react";
import { config } from "../../config";






export default function UploadedFilePreview({ url, onRemoveClicked }) {




    return (
        <div>
            {
                onRemoveClicked
                && (
                    <button
                        className="button"
                        style={{display: "inline"}}
                        onClick={(e) => {
                            e.preventDefault();
                            onRemoveClicked();
                        }}
                    >
                        Retirer
                    </button>
                )
            }
            <div style={{display: "inline"}}>
                <a rel="noreferrer" target="_blank" href={config.backend + url} >{url}</a>
            </div>
        </div>
    );
};




