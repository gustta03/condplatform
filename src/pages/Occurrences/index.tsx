import { useCallback, useEffect, useMemo, useState } from 'react'
import { AreaTable } from '../../components/TableArea'
import { Theme } from '../../components/SideBarTheme'
import { TableHead } from '../../components/TableHead'
import { api } from '../../services/api/api'
import { Photo, Unit, Date, Checked } from './styles'
import { Root } from '@radix-ui/react-dialog'

import { Pagination } from '../../components/Pagenation'

// import { LoadingRequest } from '../../components/Loading/Loading'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface WarningTypes {
  title: string
  datecreated: string
  datecreated_formatted: string
  id: number
  id_unit: number
  photos: string[]
  status: string
  name_unit: string
}

export const Ocorrencias = () => {
  const [warningData, setWarningData] = useState<WarningTypes[]>([])

  const [StateModal, setStateModal] = useState(false)
  const [Loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const [photoList, setPhotoList] = useState<any>([])

  const token: string | null = localStorage.getItem('@user:admin')

  const PageSize = 7

  const [currentPage, setCurrentPage] = useState(1)

  const firstPageIndex = (currentPage - 1) * PageSize
  const lastPageIndex = firstPageIndex + PageSize
  const currentItems = warningData.slice(firstPageIndex, lastPageIndex)

  const getOcoreencias = useCallback(async () => {
    await api
      .get('/warnings', {
        params: {
          token,
        },
      })
      .then(res => {
        setWarningData(res.data.list)
      })
  }, [warningData])

  const updateStatuswarnig = useCallback(async (id: number) => {
    setLoading(true)
    const get = await api
      .put(`/warning/${id}`, {
        token: token,
      })
      .then(res => {
        if (res.data.error === '') {
          getOcoreencias()
          setLoading(false)
        }
      })
  }, [])

  useEffect(() => {
    getOcoreencias()
  }, [])

  return (
    <Root open={StateModal}>
      <Theme>
        <div>Tela de ocorrências</div>
        <AreaTable>
          <TableHead resolvidos="Resolvido" unit photos date="Data" title />

          {currentItems.map(item => {
            return (
              <div key={item.id}>
                <Checked
                  type={'checkbox'}
                  checked={item.status === 'RESOLVED' ? true : false}
                  onClick={() => updateStatuswarnig(item.id)}
                />
                <Unit>{item.name_unit}</Unit>
                <p>{item.title}</p>
                <Date>{item.datecreated_formatted}</Date>

                <Photo
                  onClick={() => {
                    setPhotoList(item.photos)
                    setOpen(true)
                    console.log(item.photos)
                  }}
                >
                  {' '}
                  <div>
                    {item.photos.length} foto{item.photos.length > 1 ? 's' : ''}
                  </div>
                </Photo>
              </div>
            )
          })}
        </AreaTable>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: photoList,
            },
          ]}
        />

        <Pagination
          currentPage={currentPage}
          totalCount={warningData.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </Theme>
    </Root>
  )
}
