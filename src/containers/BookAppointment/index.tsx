import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import nprogress from 'accessible-nprogress'
import dataAction from '../../store/actions/dataAction'
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar'
import LeftBar from '../../components/BookAppointmentComponents/LeftBar'
import RightBookAppointment from '../../components/BookAppointmentComponents/RightBookAppointment';
import ActivityDetection from '../../components/ActivityDetection'
import { Appointment } from '../../domain/Appointment'
import './styles.scss'

interface IBookAppointmentProps {
  contactRM: {
    dataList?: {
      relationshipManager: {
        photoUrl: string
        stars: number
        name: string
        role: string
        state: string
        email: string
        phoneNumber: string
        description: string
        availableToday: string[]
      }
      contactDetails: {
        address: string
        mapUrl: string
      }
      appointment: Appointment[]
      reviews: {
        averageRating: number
        customerReviews: number
        ratingDetails: {
          rate: number
          percentage: number
        }[]
        reviews: {
          username: string
          usernameLabel: string
          isMe: boolean
          date: string
          rate: number
          description: string
        }[]
      }
    }
  }
  dataAction?: any
}

const BookAppointment: React.FunctionComponent<IBookAppointmentProps> = (props) => {
  const [individualBusiness, setIndividualBusiness] = useState('individual')

  const [headerBreadcrumbData] = useState([
    {
      pageName: 'home',
      pageUrl: '/customerDashboard',
    },
    {
      pageName: 'contact_rm',
      pageUrl: '#',
    },
    {
      pageName: 'book_appointment',
      pageUrl: '/contactRM/BookAppointment',
    },
  ])

  useEffect(() => {
    const input = document.body as HTMLInputElement
    input.classList.add('bg-gray')
    return () => {
      // Anything in here is fired on component unmount.
      input.classList.remove('bg-gray')
    }
  }, [])

  useEffect(() => {
    nprogress.configure({ parent: 'main' })
    nprogress.start()
    props.dataAction.getContactRMData()
  }, [props.dataAction])

  const changeIndividualBusiness = (accountType: string) => {
    if (accountType === 'individual' || accountType === 'business') {
      setIndividualBusiness(accountType)
    }
  }

  const { dataList } = { ...props.contactRM }

  nprogress.done()

  return (
    <React.Fragment>
      <DashboardLeftSidebar
        headerWhiteBg={true}
        title="Relationship Manager"
        desktopShownIcon=""
        mobileShownIcon="Back"
        showDemoLink={false}
        headerBreadcrumbData={headerBreadcrumbData}
        setIndividualBusiness={(accountType: string) => changeIndividualBusiness(accountType)}
      />

      {!!dataList && (
        <div className="content online-transaction-status-content">
          <div className="mains">
            <ActivityDetection />

            {individualBusiness === '' ? '&nbsp;' : ''}

            <div className="three-row">
              <div className="two-row ">
                <LeftBar
                  data={dataList.relationshipManager}/>

                <div className={`right-container`}>
                  <RightBookAppointment />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => ({ ...state.dataReducer })

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
})

export default connect(mapStateToProps, matchDispatchToProps)(BookAppointment)
