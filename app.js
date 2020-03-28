// Get modals and modal triggers and body
const modals = document.querySelectorAll('[data-modal]');
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const body = document.querySelector('body');

// Check if modal triggers exist
if(modalTriggers.length > 0) {
  // Loop through triggers
  for(let trigger of modalTriggers) {
    // Add click event to trigger
    trigger.addEventListener('click', openModal);
  }
}

// Check if modals exist
if(modals.length > 0) {
  // Loop through modals
  for(let modal of modals) {
    // Get modal close elements
    const closeModalEls = modal.querySelectorAll('[data-modal-close]');
    // Check if close elements exist
    if(closeModalEls.length > 0) {
      // Loop through close elements
      for(let closeModalEl of closeModalEls) {
        // Add click event to close element
        closeModalEl.addEventListener('click', closeModal);
      }
    }
    // Add click event to modal 
    modal.addEventListener('click', closeModalOnBackdropClick);
  }
}

function openModal(e) {
  e.preventDefault();
  // Get modal target from data-modal-target attribute
  const modalTarget = e.target.dataset.modalTarget;
  // Get modal
  const modal = document.querySelector(`[data-modal="${modalTarget}"]`);
  if(modal) {
    // Get modal duration
    const modalDuration = getModalDuration(modal);
    // Get modal box
    const modalBox = modal.querySelector('.modal__box');
    // Add opened class to modal
    modal.classList.add('opened');
    body.style.overflow = 'hidden';
    setTimeout(() => {
      modalBox.style.transitionDuration = modalDuration + 'ms';
      modalBox.classList.add('animate');
      modal.style.transitionDuration = modalDuration + 'ms';
      modal.style.opacity = 1;
    }, 0);
  }
}

function closeModal(e) {
  e.preventDefault();
  // Get close element
  const el = e.target;
  // Get modal
  const modal = el.closest('[data-modal]');
  // Close modal
  close(modal);
}

function closeModalOnBackdropClick(e) {
  e.preventDefault();
  // Get clicked element
  const el = e.target;
  // Check if clicked element is modal
  if(el.classList.contains('modal')) {
    // Close modal
    close(el);
  }
}

function close(modal) {
  // Get modal duration
  const modalDuration = getModalDuration(modal);
  // Get modal box
  const modalBox = modal.querySelector('.modal__box');
  // Reset opacity and remove opened class from modal and animate class from modal box
  modal.style.opacity = 0;
  modalBox.classList.remove('animate');
  setTimeout(() => {
    modal.classList.remove('opened');
    body.style.overflow = 'auto';
  }, modalDuration);
}

function getModalDuration(modal) {
  const modalDuration = modal.dataset.modalDuration;
  if(modalDuration && parseInt(modalDuration) > 0) {
    return parseInt(modalDuration);
  }else {
    return 300;
  }
}