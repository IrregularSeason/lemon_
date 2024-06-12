import React, { useState } from 'react';
import { Upload, Progress } from '@arco-design/web-react';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import { UploadItem, UploadProps } from '@arco-design/web-react/es/Upload';
import { uploadImage } from '@/service/dashboard';

interface ImageUploadProps {
  uploadProps: UploadProps;
  cs: string;
  file: UploadItem;
}

export const useImageUpload = () => {
  const [file, setFile] = useState<UploadItem>();

  const [imageUrl, setImageUrl] = useState<string>();

  const cs = `arco-upload-list-item${
    file && file.status === 'error' ? ' is-error' : ''
  }`;

  const changeHandler = (_, currentFile) => {
    setFile({
      ...currentFile,
      url: URL.createObjectURL(currentFile.originFile),
    });
  };

  const progressHandler = (currentFile) => {
    setFile(currentFile);
  };

  const customRequest = async (options) => {
    const { file, onSuccess } = options;
    const { path } = await uploadImage(file);
    onSuccess();
    setImageUrl(path);
  };

  const props: ImageUploadProps = {
    uploadProps: {
      fileList: file ? [file] : [],
      showUploadList: false,
      onChange: changeHandler,
      onProgress: progressHandler,
      customRequest,
    },
    cs,
    file,
  };
  return {
    props,
    imageUrl,
  };
};

function ImageUpload(props: ImageUploadProps) {
  const { cs, file } = props;
  return (
    <Upload {...props.uploadProps}>
      <div className={cs}>
        {file && file.url ? (
          <div className="arco-upload-list-item-picture custom-upload-avatar">
            <img src={file.url} />
            <div className="arco-upload-list-item-picture-mask">
              <IconEdit />
            </div>
            {file.status === 'uploading' && file.percent < 100 && (
              <Progress
                percent={file.percent}
                type="circle"
                size="mini"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                }}
              />
            )}
          </div>
        ) : (
          <div className="arco-upload-trigger-picture">
            <div className="arco-upload-trigger-picture-text">
              <IconPlus />
              <div style={{ marginTop: 10, fontWeight: 600 }}>上传图片</div>
            </div>
          </div>
        )}
      </div>
    </Upload>
  );
}

export default ImageUpload;
