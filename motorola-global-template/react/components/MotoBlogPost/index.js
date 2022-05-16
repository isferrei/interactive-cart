import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';

class MotoBlogPost extends React.Component {

    static schema = {
        title: "Motorola Blog Post",
        description: "Motorola Blog Post",
        type: "object",
        properties: {
            showBlogPost: {
                type: "boolean",
                title: "Motorola Blog Post",
                default: false
            }
        }
    }

    render() {
        const { showBlogPost } = this.props;
        return (
            <>
                {
                    showBlogPost ?
                        <>
                            <ExtensionPoint id="moto-blog-post-header"></ExtensionPoint>
                            <ExtensionPoint id="moto-blog-post-content"></ExtensionPoint>
                            <ExtensionPoint id="moto-blog-press-releases"></ExtensionPoint>
                            <ExtensionPoint id="moto-blog-downloads"></ExtensionPoint>
                            <ExtensionPoint id="moto-blog-post-share"></ExtensionPoint>
                            <ExtensionPoint id="moto-blog-post-related-stories"></ExtensionPoint>
                        </> :
                        null

                }

            </>
        )
    }
}

export default MotoBlogPost;