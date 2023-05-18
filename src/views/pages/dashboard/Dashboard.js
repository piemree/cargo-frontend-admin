import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import request from 'src/request';

const Dashboard = () => {
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    request
      .get('/branch/getAllBranches')
      .then((response) => {
        setBranchList(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Şubeler</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Şube Adı</CTableHeaderCell>
                    <CTableHeaderCell>Toplam Kargo Sayısı</CTableHeaderCell>
                    <CTableHeaderCell>Bekleyen Kargo Sayısı</CTableHeaderCell>
                    <CTableHeaderCell>Personel Sayısı</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {branchList.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.cargos?.length}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.waitingCargos?.length}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.personels?.length}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.isActive ? 'Aktif' : 'Pasif'}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
