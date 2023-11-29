import Form from '@components/Modal/ModalForm'
import useSnackBar from '@hooks/SnackBar'
import SnackBar from '@components/SnackBar'
import { ChangeEvent, useRef, useState } from 'react'
import { CONFIRM_MESSAGE, DEBOUNCE_DURATION, SNACKBAR_MESSAGE, SNACKBAR_STATUS } from '@constants'
import { validateForm, validateUserForm } from '@validators'
import { CheckBox, CustomError, UserField } from '@types'
import { useUser } from '@contexts'
import './userPage.css'
import { debounce } from '@helpers'
import Header from './Header'
import LoadingIndicator from '@components/LoadingIndicator'
import Confirm from '@components/Modal/ModalConfirm'
import usePagination from '@hooks/Pagination'
import Pagination from '@components/Pagination'
import Table from '@components/Table'
import UserCard from '@components/UserCard'

const UserPage = () => {
  const {
    handleAddUser,
    handleSearchUser,
    handleFilterStatus,
    handleLimitUser,
    handlePaginationPage,
    resetUserData,
    updateChangeField,
    handleDeleteUser,
    handleDetailUser,
    handleEditUser,
    handleDeleteMultipleUser,
    setUserData,
    initialState,
    userData,
    users,
  } = useUser()
  const { SnackBar: snackBarState, showSnackBar, clearSnackBar } = useSnackBar()
  const {
    isActiveNextIcon,
    isActivePreviousIcon,
    isLoadingIndicator,
    handleLimitList,
    handleNextPageList,
    handlePreviousPageList,
    setIsLoadingIndicator,
    hasPagination,
  } = usePagination(handlePaginationPage, handleLimitUser, showSnackBar, users)
  const [errorMessage, setErrorMessage] = useState<UserField>(initialState)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const [userId, setUserId] = useState('')
  const filterOptionRef = useRef('')

  const handleCloseForm = () => {
    setIsOpenForm((prevState) => !prevState)

    userData.id && resetUserData()
    setErrorMessage(initialState)
  }

  const toggleConfirmDelete = () => {
    setIsOpenConfirmDelete((prevState) => !prevState)
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateChangeField({ [e.target.name]: e.target.value })
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidForm: UserField | null = validateForm(userData, validateUserForm)

    if (isValidForm) {
      return setErrorMessage(isValidForm)
    }

    try {
      setIsLoadingForm((prevState) => !prevState)
      await handleAddUser(userData)

      resetUserData()
      showSnackBar(SNACKBAR_MESSAGE.ADD_SUCCESS, SNACKBAR_STATUS.SUCCESS)

      handleCloseForm()
    } catch (error) {
      const customError = error as CustomError

      showSnackBar(customError.message, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingForm((prevState) => !prevState)
  }

  const handleSearchList = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchUser(e.target.value)
  }, DEBOUNCE_DURATION)

  const handleFilterList = async (option: string | ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = typeof option === 'string' ? option : option.target.value

    if (selectedValue === filterOptionRef.current) {
      setSelectedFilterOption('')
      handleFilterStatus('')
    } else {
      setSelectedFilterOption(selectedValue)
      handleFilterStatus(selectedValue)
      filterOptionRef.current = selectedValue
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidForm: UserField | null = validateForm(userData, validateUserForm)

    if (isValidForm) {
      return setErrorMessage(isValidForm)
    }

    try {
      setIsLoadingForm((prevState) => !prevState)
      await handleEditUser(userData.id, userData)

      resetUserData()
      showSnackBar(SNACKBAR_MESSAGE.UPDATE_SUCCESS, SNACKBAR_STATUS.SUCCESS)

      handleCloseForm()
    } catch (error) {
      const customError = error as CustomError

      showSnackBar(customError.message, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingForm((prevState) => !prevState)
  }

  const handleOpenConfirmModal = (id: string) => {
    setUserId(id)
    toggleConfirmDelete()
  }

  const handleOpenFormDetail = async (id: string) => {
    const userDetail = await handleDetailUser(id)

    setUserData(userDetail)
    handleCloseForm()
  }

  const handleCheckboxChange = ({ isChecked, checkboxId }: CheckBox) => {
    // const { id, checked } = e.target

    setChecked((prevState) => {
      return isChecked
        ? Array.from(new Set([...prevState, checkboxId]))
        : prevState.filter((item) => item !== checkboxId)
    })
  }

  const handleDeleteMultiple = async () => {
    setIsLoadingIndicator((prev) => !prev)
    try {
      await handleDeleteMultipleUser(checked)
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_SUCCESS, SNACKBAR_STATUS.SUCCESS)
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_FAILED, SNACKBAR_STATUS.ERROR)
    }
    setIsLoadingIndicator((prev) => !prev)
    setChecked([])
  }

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteUser(userId)

      showSnackBar(SNACKBAR_MESSAGE.REMOVE_SUCCESS, SNACKBAR_STATUS.SUCCESS)
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_FAILED, SNACKBAR_STATUS.ERROR)
    }

    toggleConfirmDelete()
  }

  return (
    <main className='main-container'>
      <Header
        checked={checked.length}
        selected={selectedFilterOption}
        onChangeSearch={handleSearchList}
        onClickSelectOption={handleFilterList}
        onOpenForm={handleCloseForm}
        onDeleteMutiple={handleDeleteMultiple}
      />

      <div className='main-content'>
        <Table
          onChangeCheckbox={handleCheckboxChange}
          data={users}
          onClickDelete={handleOpenConfirmModal}
          onClickEdit={handleOpenFormDetail}
        />

        <UserCard
          onChangeCheckbox={handleCheckboxChange}
          data={users}
          onClickDelete={handleOpenConfirmModal}
          onClickEdit={handleOpenFormDetail}
        />
      </div>

      <div className='main-footer'>
        {hasPagination && (
          <Pagination
            isActiveNextIcon={isActiveNextIcon}
            isActivePreviousIcon={isActivePreviousIcon}
            onChangeLimitPagination={handleLimitList}
            onClickNext={handleNextPageList}
            onClickPrevious={handlePreviousPageList}
          />
        )}
      </div>

      {isLoadingIndicator && <LoadingIndicator />}

      {isOpenForm && (
        <Form
          title={userData.id ? 'Update User' : 'Add User'}
          primaryTitle={userData.id ? 'Update User' : 'Add User'}
          data={userData}
          isLoading={isLoadingForm}
          onCloseForm={handleCloseForm}
          onSubmitForm={userData.id ? handleUpdateUser : handleCreateUser}
          onChangeField={handleFieldChange}
          errorMessage={errorMessage}
        />
      )}

      {isOpenConfirmDelete && (
        <Confirm
          isLoading={isLoadingForm}
          onConfirm={handleConfirmDelete}
          onCloseConfirm={toggleConfirmDelete}
          title='Confirm Delete'
          message={CONFIRM_MESSAGE.CONFIRM_REMOVE}
        />
      )}

      {snackBarState.isOpen && (
        <SnackBar
          message={snackBarState.message}
          status={snackBarState.status}
          onCloseSnackBar={clearSnackBar}
        />
      )}
    </main>
  )
}

export default UserPage