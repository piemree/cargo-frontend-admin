import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CButton,
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
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [branchList, setBranchList] = useState([]);
  const [personelList, setPersonelList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const branchDelete = async (branchId) => {
    // create a confirmation dialog
    if (!window.confirm('Şubeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const result = await request.delete(`/branch/deleteBranch/${branchId}`);
      if (result.data.success) {
        alert('Şube silindi');
        setBranchList(branchList.filter((item) => item._id !== branchId));
      }
    } catch (error) {
      alert('Şube silinemedi');
      console.log(error);
    }
  };
  const personelDelete = async (personelId) => {
    // create a confirmation dialog
    if (!window.confirm('Personeli silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const result = await request.delete(
        `/personel/deletePersonel/${personelId}`
      );
      if (result.data.success) {
        alert('Personel silindi');
        setPersonelList(personelList.filter((item) => item._id !== personelId));
      }
    } catch (error) {
      alert('Personel silinemedi');
      console.log(error);
    }
  };

  const vehicleDelete = async (vehicleId) => {
    // create a confirmation dialog
    if (!window.confirm('Araç silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const result = await request.delete(
        `/vehicle/deleteVehicle/${vehicleId}`
      );
      if (result.data.success) {
        alert('Araç silindi');
        setVehicleList(vehicleList.filter((item) => item._id !== vehicleId));
      }
    } catch (error) {
      alert('Araç silinemedi');
      console.log(error);
    }
  };

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

    request
      .get('/vehicle/getAllVehicles')
      .then((response) => {
        setVehicleList(response.data.data);
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
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {branchList?.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <Link to={`/branch/${item?._id}`}>
                          <div>{item?.name}</div>
                        </Link>
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
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          className="py-0 w-100 text-white"
                          onClick={() => branchDelete(item._id)}
                        >
                          Sil
                        </CButton>
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
                    <CTableHeaderCell>TC</CTableHeaderCell>
                    <CTableHeaderCell>E-Posta</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {personelList?.map((item, index) => (
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
                        {item?.role === 'customerServicePersonel' && (
                          <div>Müşteri Hizmetleri Personeli</div>
                        )}
                        {item?.role === 'admin' && <div>Admin</div>}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item?.branch?.name || item?.vehicle?.licensePlate}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.tcNo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          className="py-0 w-100 text-white"
                          onClick={() => personelDelete(item._id)}
                        >
                          Sil
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Araçlar</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Plaka</CTableHeaderCell>
                    <CTableHeaderCell>Personel</CTableHeaderCell>
                    <CTableHeaderCell>Kargo Sayısı</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vehicleList?.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item?.licensePlate}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item?.driver?.name} {item?.driver?.surname}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.cargos?.length}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          className="py-0 w-100 text-white"
                          onClick={() => vehicleDelete(item._id)}
                        >
                          Sil
                        </CButton>
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
