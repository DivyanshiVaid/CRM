import React from 'react';
import { Modal } from 'antd';
const PopUp = ({ showModal, handleOk, handleCancel }) => {
    return (
        <Modal title="Basic Modal" open={showModal} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to delete the product?</p>
        </Modal>
    );
};
export default PopUp;