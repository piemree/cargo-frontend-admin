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
  const [personelList, setPersonelList] = useState([]);

  useEffect(() => {
    request
      .get('/branch/getAllBranches')
      .then((response) => {
        setBranchList(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });

    request
      .get('/personel/getAllPersonels')
      .then((response) => {
        setPersonelList(response.data.data);
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
          <CCard className="mb-4">
            <CCardHeader>Personeller</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Tam Ad</CTableHeaderCell>
                    <CTableHeaderCell>Rol</CTableHeaderCell>
                    <CTableHeaderCell>Şube/Araç</CTableHeaderCell>
                    <CTableHeaderCell>Şube/Araç ID</CTableHeaderCell>
                    <CTableHeaderCell>TC</CTableHeaderCell>
                    <CTableHeaderCell>E-Posta</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {personelList.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>
                          {item?.name} {item?.surname}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item?.role === 'transportPersonel' && (
                          <div>Nakliye Personeli</div>
                        )}
                        {item?.role === 'branchPersonel' && (
                          <div>Şube Personeli</div>
                        )}
                        {item?.role === 'admin' && <div>Admin</div>}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item?.branch?.name || item?.vehicle?.licensePlate}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.branch?._id || item?.vehicle?._id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.tcNo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.email}</div>
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
