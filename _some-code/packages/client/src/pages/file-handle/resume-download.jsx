import React, { useState } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB 分片大小

const ResumeDownload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFile = async ({ file }) => {
        const fileSize = file.size;
        const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
        let uploadedChunks = 0;

        for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
            const start = chunkNumber * CHUNK_SIZE;
            const end = Math.min(fileSize, start + CHUNK_SIZE);
            // 文件分片
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', chunk);
            formData.append('filename', file.name);
            formData.append('chunkNumber', chunkNumber);
            formData.append('totalChunks', totalChunks);

            try {
                await axios.post('http://localhost:3000/file/resumeUpload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                uploadedChunks++;
                setUploadProgress(Math.round((uploadedChunks / totalChunks) * 100));
            } catch (error) {
                message.error('上传失败，请重试！');
                console.error(error);
                return;
            }
        }

        message.success('文件上传成功！');
    };

    return (
        <div style={{ padding: 20 }}>
            <Upload customRequest={uploadFile} showUploadList={false}>
                <Button icon={<UploadOutlined />}>选择文件上传</Button>
            </Upload>
            <Progress percent={uploadProgress} />
        </div>
    );
};
export default ResumeDownload;