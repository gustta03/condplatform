import { useEffect, useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { Pagination } from '../../components/Pagenation'
import { Theme } from '../../components/SideBarTheme'
import { AreaTable } from '../../components/TableArea'
import { TableHead } from '../../components/TableHead'
import { useCurrentPage } from '../../hooks/usePagination'
import { api } from '../../services/api/api'
import { Photo } from '../Occurrences/styles'
import { Date, Unit, Where } from './styles'

interface DataFoundAndLostType {
  datecreated_formatted: string
  description: string
  id: number
  status: string
  photo: string
  where: string
}

export const Achados = () => {
  const token = localStorage.getItem('@user:admin')
  const [photos, setPhotos] = useState<any>([])

  const [dataFoundAndLost, setDataFoundAndLoast] = useState<
    DataFoundAndLostType[]
  >([])

  const [open, setIsOpen] = useState(false)

  const PageSize = 7

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(dataFoundAndLost, PageSize)
  

  const getFoundAndLost = async () => {
    await api
      .get('/foundandlost', {
        params: {
          token: token,
        },
      })
      .then(res => setDataFoundAndLoast(res.data.list))
  }

  const updateFoundAndLost = async (id: number) => {
    await api
      .put(`/foundandlost/${id}`, {
        token: token,
      })
      .then(res => {
        if (res.data.error === '') {
          getFoundAndLost()
        }
      })
  }

  useEffect(() => {
    getFoundAndLost()
  }, [])

  console.log(dataFoundAndLost)
  console.log(currentItems)
  return (
    <Theme>
      <div>Tela de achados e perdidos</div>
      <AreaTable>
        <TableHead local resolvidos="recuperado" date="Data" desc photos />
        {currentItems.map(data => {
          return (
            <div key={data.id}>
              <input
                onClick={() => updateFoundAndLost(data.id)}
                type={'checkbox'}
                checked={data.status === 'recovered'}
              />
              <Where>{data.where}</Where>
              <Unit>{data.description}</Unit>
              <Date>{data.datecreated_formatted}</Date>
              <Photo
                onClick={() => {
                  setPhotos(data.photo)
                  setIsOpen(true)
                }}
              >
                <div>1 foto</div>
              </Photo>
            </div>
          )
        })}
      </AreaTable>

      <Lightbox
        open={open}
        close={() => setIsOpen(false)}
        slides={[
          {
            src: photos,
          },
        ]}
      />
      <Pagination
        currentPage={currentPage}
        totalCount={dataFoundAndLost.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Theme>
  )
}
