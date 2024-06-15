import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TopHeader from "../../components/TopHeader";
import { Modal } from 'antd';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { Space, Typography } from 'antd';
import {GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';

const { Text } = Typography;

const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{ backgroundColor: '#1890ff'}}
    >
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const OrderPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  
  const loadProducts = async () => {
        const result = await axios.get(`https://buckytank.shop/products?limit=100`, config);
        const {products} = result.data;
        // console.log(products);
        setProducts(products.filter(product => product.isDeleted === false)); 
  };

  const loadProduct = async (id) => {
        const result = await axios.get(`https://buckytank.shop/products/${id}`, config);
        // const {dataProduct } = result.data;
        setProduct(result.data);
  }
  useEffect(() => {
      loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`https://buckytank.shop/products/${id}`, config)
    .then(() => {
      toast.info('Xóa sản phẩm thành công', {
        position: "top-center",
        autoClose:1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
    .catch(err => {
      console.log(err);
    })
    loadProducts();
  }

  const columns = [
    { 
      field: "id",
      key: "id",
      headerName: "ID", 
      flex: 0.5 },
    {
      field: "title",
      key: "title",
      headerName: "Tên sản phẩm",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand",
      key: "brand",
      headerName: "Hãng",
      flex: 1,
    },
    {
      field: "category",
      key: "category",
      headerName: "Danh mục",
      flex: 1,
    },
    {
      field: "stock",
      key: "stock",
      headerName: "Số lượng",
      flex: 1,
    },
    {
      field: "price",
      key: "price",
      headerName: "Giá",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      align: "left",
    },
    {
      key: "action",
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        // console.log(params.row.id);
        return (
          <Box>
            <IconButton aria-label="view" color="primary"
              title="Preview product"
              onClick={() => {
                // console.log(params.row.id);
                loadProduct(params.row.id);
                setModalVisible(true);
              }} 
            >
              < PreviewIcon />
            </IconButton> 
            <IconButton aria-label="view" color="primary"
              title="View product"
              onClick={() => {
                navigate(`/admin/view-product/${params.row.id}`);
              }} 
            >
              < VisibilityIcon />
            </IconButton> 

            <Link to={`/admin/edit-product/${params.row.id}`}>
              <IconButton aria-label="edit" color="success" title="Edit product">
              <EditIcon />
            </IconButton> 
            </Link>
            <IconButton aria-label="delete" color="error"
              title="Delete product"
              onClick={() => {
                  deleteProduct(params.row.id);
                }} 
            >
              <DeleteIcon />
            </IconButton> 
          </Box>
        );
      },
      
    }
  ]
  return (
    <>
      <TopHeader title="SẢN PHẨM" subtitle="Quản lý thông tin các sản phẩm" />
      <Box m="20px" sx={{display:'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}
            sx={{backgroundColor: '#1890ff'}}
            onClick={() => navigate('/admin/add-product')}
        >Thêm sản phẩm</Button>
      </Box>
      
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="90vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#12509C",
            },
            "& .phone-column--cell": {
              color: "#868dfb",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1890ff",
            },

            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#e0e0e0 !important`,
            },
          }}
        >
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{
              '& .MuiTablePagination-root': {
                color: 'white',
              },
            }}  
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomGridToolbar }}
          />
          
        </Box>

        
      </Box>
      <ToastContainer/>
      <Modal
        // title="Product Information"
        
        visible={modalVisible}
        onCancel={() => setModalVisible(false)} 
        footer={[ ]}
      >
        <Carousel arrows infinite={false} dotWidth={20}>
            {product.images && product.images.map((imageUrl, index) => (
              <Image
                key={index} 
                width={476}
                height={300}
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
              />
            ))}
        </Carousel>
        <br/>
        <Space direction="vertical">
          <Text type="secondary">ID: <Text strong>{product ? product.id : null}</Text></Text>
          <Text type="secondary">Tên sản phẩm: <Text strong>{product ? product.title : null}</Text></Text>
          <Text type="secondary">Hãng: <Text strong>{product ? product.brand : null}</Text></Text>
          <Text type="secondary">Danh mục: <Text strong>{product ? product.category : null}</Text></Text>
          <Text type="secondary">Mô tả: <Text strong>{product ? product.description : null}</Text></Text>
          <Text type="secondary">Số lượng: <Text strong>{product ? product.stock : null}</Text></Text>
          <Text type="secondary">Giá: <Text strong>{product ? product.price : null} VNĐ</Text></Text>
          <Text type="secondary">Giảm giá: <Text strong>{product ? product.discountPercentage : null} %</Text></Text>
          <Text type="secondary">Đánh giá: <Text strong>{product ? product.rating : null}/5</Text></Text>
          <Text type="secondary">Thông số chi tiết: <Text strong>{product ? product.spec : null}</Text></Text>
        </Space>
      </Modal>


    </>
  )
}

export default OrderPage