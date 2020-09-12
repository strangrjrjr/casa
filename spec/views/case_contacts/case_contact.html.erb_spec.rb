require "rails_helper"

describe "case_contacts/case_contact" do
  it "shows edit button when occured_at is before the last day of the month in the quarter that the case contact was created" do
    case_contact = create(:case_contact)
    assign :case_contact, case_contact
    assign :casa_cases, [case_contact.casa_case]

    user = build_stubbed(:supervisor)
    allow(view).to receive(:current_user).and_return(user)

    render(partial: "case_contacts/case_contact", locals: { contact: case_contact})
    expect(rendered).to have_link(nil, href: "/case_contacts/#{case_contact.id}/edit")
  end

  it "does not show edit button when occured_at is after the last day of the month in the quarter that the case contact was created" do
    case_contact = create(:case_contact, occurred_at: Time.zone.now - 1.year)
    assign :case_contact, case_contact
    assign :casa_cases, [case_contact.casa_case]

    user = build_stubbed(:supervisor)
    allow(view).to receive(:current_user).and_return(user)

    render(partial: "case_contacts/case_contact", locals: { contact: case_contact})
    expect(rendered).to have_no_link(nil, href: "/case_contacts/#{case_contact.id}/edit")
  end
end
