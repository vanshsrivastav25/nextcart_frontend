import React from 'react'
import Layout from './common/Layout'
import AdminSidebar from './common/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Sample = () => {
  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 col-md-4 mb-3">
            <AdminSidebar />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-9 col-md-8">
            <div className="card admin-card">
              {/* HEADER */}
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Title</h5>
                  <button className="btn btn-primary btn-sm">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Create
                  </button>
              </div>

              {/* BODY */}
              <div className="card-body p-0">

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sample